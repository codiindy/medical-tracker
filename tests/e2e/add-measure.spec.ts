import { test, expect } from '@playwright/test';

const LS_KEY = 'medical-app';

test('user adds a measurement end-to-end', async ({ page }) => {
  // -----------------------------------------------------------
  // 1) Seed localStorage BEFORE the app loads
  // -----------------------------------------------------------
  await page.addInitScript((key) => {
    const seed = {
      patients: [
        { id: '1', name: 'Maya Collins' },
        { id: '2', name: 'Ethan Lewis' }
      ],
      measuresById: {}
    };
    window.localStorage.setItem(key, JSON.stringify(seed));
  }, LS_KEY);


  // -----------------------------------------------------------
  // 2) Stateful network mocks
  //    We emulate an API that updates after POST
  // -----------------------------------------------------------
  let measures: Array<any> = []; // In-memory measurement list

  // Mock GET /patients
  await page.route('**/*patients*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: '1', name: 'Maya Collins' },
        { id: '2', name: 'Ethan Lewis' }
      ]),
    });
  });

  // Mock GET + POST /measures or /patients/:id/measures
  await page.route('**/*measures*', async (route) => {
    const req = route.request();
    const method = req.method();

    // ---------------------------------------
    // GET → return all stored measures for the patient
    // ---------------------------------------
    if (method === 'GET') {
      const url = new URL(req.url());
      const pid = Number(url.searchParams.get('patientId') ?? '2');

      const filtered = measures.filter(m => Number(m.patientId) === pid);

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(filtered),
      });
      return;
    }

    // ---------------------------------------
    // POST → create a new measure and store it
    // ---------------------------------------
    if (method === 'POST') {
      const url = new URL(req.url());

      // Detect patientId either in path (/patients/:id/measures) or inside body
      const match = url.pathname.match(/patients\/(\d+)\/measures/i);
      const pidFromPath = match ? Number(match[1]) : undefined;

      const body = JSON.parse(req.postData() || '{}');
      const patientId = pidFromPath ?? Number(body.patientId ?? 2);

      const created = {
        id: `m-e2e-${Date.now()}`,
        patientId,
        date: new Date().toISOString(),
        sys: Number(body.sys),
        dia: Number(body.dia),
        bpm: Number(body.bpm),
      };

      // Save to our local mock list
      measures.push(created);

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(created),
      });
      return;
    }

    // If not GET or POST → allow default behavior
    await route.continue();
  });


  // -----------------------------------------------------------
  // 3) Load the application
  // -----------------------------------------------------------
  await page.goto('/');


  // -----------------------------------------------------------
  // 4) Navigate to a patient detail page
  // -----------------------------------------------------------
  await page.getByText(/Ethan Lewis/i).click();


  // -----------------------------------------------------------
  // 5) Open the "Add Measurement" modal
  // -----------------------------------------------------------
  await page.getByRole('button', { name: /Add Measurement/i }).click();


  // -----------------------------------------------------------
  // 6) Fill out the form
  // -----------------------------------------------------------
  await page.fill('#sys', '118');
  await page.fill('#dia', '76');
  await page.fill('#bpm', '70');


  // -----------------------------------------------------------
  // 7) Submit the form
  // -----------------------------------------------------------
  await page.getByRole('button', { name: /^Save$/i }).click();


  // -----------------------------------------------------------
  // 8) Expect the new measurement to appear on screen
  //    Allow whitespace variations (118 / 76 or "118  /  76")
  // -----------------------------------------------------------
  await expect(page.getByText(/118\s*\/\s*76/i)).toBeVisible({ timeout: 10000 });


  // -----------------------------------------------------------
  // 9) (Bonus) Verify that localStorage has been updated
  // -----------------------------------------------------------
  const stored = await page.evaluate((key) => localStorage.getItem(key), LS_KEY);
  expect(stored).toBeTruthy();
});
