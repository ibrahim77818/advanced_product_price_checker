# -*- coding: utf-8 -*-
# Part of advanced_product_price_checker. License LGPL-3.0 (https://www.gnu.org/licenses/lgpl-3.0.html).
from odoo.tests import HttpCase, tagged

from .common import PriceCheckerCommon


@tagged('post_install', '-at_install', 'advanced_product_price_checker')
class TestPriceCheckerUi(PriceCheckerCommon, HttpCase):
    """Browser tour on the public kiosk: scanning, variant matrix, stock matrix, history."""

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.setup_price_checker_data()
        # Deterministic UI: no auto-clear during the tour.
        cls.config.write({'clear_delay': 0, 'camera_enabled': False})

    def test_price_checker_tour(self):
        self.start_tour('/product_checker/token/%s' % self.config.token,
                        'advanced_product_price_checker_tour')
