import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage, CheckoutPage } from '../pages';

test('checkout with bad information shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('sauce-labs-onesie');
  await inventoryPage.goToCart();
  await cartPage.checkout();
  await checkoutPage.continue();

  const errorClass = await checkoutPage.firstNameInput.getAttribute('class');
  expect(errorClass).toContain('error');
});

test('checkout with good information proceeds to next step', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('sauce-labs-onesie');
  await inventoryPage.goToCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation('Luke', 'Perry', '90210');
  await checkoutPage.continue();

  await expect(page).toHaveURL('/checkout-step-two.html');
});

test('complete checkout successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('sauce-labs-onesie');
  await inventoryPage.goToCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation('Luke', 'Perry', '90210');
  await checkoutPage.continue();
  await checkoutPage.finish();

  await expect(page).toHaveURL('/checkout-complete.html');
  await expect(page.locator('.complete-text')).toBeVisible();
});