import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton;
  readonly continueShoppingButton;
  readonly removeButton;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async removeItem(itemName: string) {
    await this.page.locator(`[data-test="remove-${itemName}"]`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}