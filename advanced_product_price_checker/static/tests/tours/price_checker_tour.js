/** @odoo-module **/
/**
 * Kiosk tour (see tests/test_ui.py for the data):
 * scan a variant barcode, navigate the attribute matrix (including an
 * unavailable combination), check the multi-location stock and the
 * variants x warehouses matrix, then the session history.
 *
 * Odoo 18 tours: steps without ``run`` only wait for their trigger
 * (assertions); actions are explicit ("click", "edit <text>").
 */
import { registry } from "@web/core/registry";

registry.category("web_tour.tours").add("advanced_product_price_checker_tour", {
    steps: () => [
        {
            content: "The kiosk is mounted",
            trigger: ".o_ppc_root.o_ppc_ready .o_ppc_idle",
        },
        {
            content: "Scan the Red / M barcode",
            trigger: ".o_ppc_search_input",
            run: "edit PPCREDM0001",
        },
        {
            content: "Submit",
            trigger: ".o_ppc_search_btn",
            run: "click",
        },
        {
            content: "The scanned product is displayed",
            trigger: ".o_ppc_product_name:contains('PPC Test Tee')",
        },
        {
            content: "The scanned variant is pre-selected",
            trigger: ".o_ppc_default_code:contains('PPC-RED-M')",
        },
        {
            content: "Size M has its price extra",
            trigger: ".o_ppc_price:contains('110')",
        },
        {
            content: "Shelf 1: 7 on hand - 2 reserved = 5 available",
            trigger: ".o_ppc_stock_loc[data-location-name$='PPC Shelf 1'] .o_ppc_available:contains('5')",
        },
        {
            content: "Second warehouse is listed",
            trigger: ".o_ppc_stock_wh[data-warehouse-code='PPC2'] .o_ppc_available:contains('5')",
        },
        {
            content: "Total available across warehouses",
            trigger: ".o_ppc_stock_total .o_ppc_available:contains('14')",
        },
        {
            content: "Switch colour to Blue (Blue / M does not exist)",
            trigger: ".o_ppc_value[data-value-name='Blue']",
            run: "click",
        },
        {
            content: "Closest existing variant Blue / S is selected",
            trigger: ".o_ppc_default_code:contains('PPC-BLU-S')",
        },
        {
            content: "The price follows the variant",
            trigger: ".o_ppc_price:contains('100')",
        },
        {
            content: "M is flagged unavailable with Blue",
            trigger: ".o_ppc_value.o_ppc_unavailable[data-value-name='M']",
        },
        {
            content: "Blue / S has no stock",
            trigger: ".o_ppc_stock_total .o_ppc_status_out",
        },
        {
            content: "Pick the unavailable M: jump back to Red / M",
            trigger: ".o_ppc_value.o_ppc_unavailable[data-value-name='M']",
            run: "click",
        },
        {
            content: "Red / M again",
            trigger: ".o_ppc_default_code:contains('PPC-RED-M')",
        },
        {
            content: "Open the variants x warehouses matrix",
            trigger: ".o_ppc_tab_variants",
            run: "click",
        },
        {
            content: "The current variant is highlighted",
            trigger: ".o_ppc_matrix_row.o_ppc_selected:contains('Red, M')",
        },
        {
            content: "Select Red / S from the matrix",
            trigger: ".o_ppc_matrix_row:contains('Red, S')",
            run: "click",
        },
        {
            content: "Red / S is displayed",
            trigger: ".o_ppc_default_code:contains('PPC-RED-S')",
        },
        {
            content: "Red / S is highlighted in the matrix",
            trigger: ".o_ppc_matrix_row.o_ppc_selected:contains('Red, S')",
        },
        {
            content: "Back to the home screen",
            trigger: ".o_ppc_brand",
            run: "click",
        },
        {
            content: "The product is in the session history",
            trigger: ".o_ppc_history_item:contains('PPC Test Tee')",
            run: "click",
        },
        {
            content: "History opens the product again",
            trigger: ".o_ppc_default_code:contains('PPC-RED-S')",
        },
    ],
});
