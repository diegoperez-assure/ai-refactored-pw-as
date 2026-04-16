import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage, CheckoutPage } from '../pages';

test('cancel from cart returns to inventory', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.goToCart();
  await cartPage.continueShopping();

  await expect(page).toHaveURL('/inventory.html');
});

test('cancel from info page returns to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('sauce-labs-onesie');
  await inventoryPage.goToCart();
  await cartPage.checkout();
  await checkoutPage.cancel();

  await expect(page).toHaveURL('/cart.html');
});

test('cancel from checkout page returns to inventory', async ({ page }) => {
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
  await checkoutPage.cancel();

  await expect(page).toHaveURL('/inventory.html');
});

test('start checkout navigates to checkout page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('sauce-labs-onesie');
  await inventoryPage.goToCart();
  await cartPage.checkout();

  await expect(page).toHaveURL('/checkout-step-one.html');
});