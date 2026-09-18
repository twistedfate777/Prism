const fs = require('fs');
const path = require('path');
const { runProtect } = require('../lib/protect');

// A basic test runner for the PRISM PROTECT pipeline.
// Note: Generating synthetic test images with text and faces programmatically in Node
// is non-trivial without heavy dependencies (e.g., using Canvas to draw text/faces).
// For the sake of this test script, we will test the text-only path for regex validation,
// and stub the image parts if actual image files aren't provided.

async function runTests() {
  console.log("=== PRISM Backend Tests ===\n");
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. Phone number detection (Text only)
  try {
    const res1 = await runProtect(null, "Hubungi saya di 0812-3456-7890 sekarang.");
    assert(res1.flags.some(f => f.type === 'phone_number'), "Text: Detects Indonesian phone number");
  } catch (e) {
    assert(false, "Text: Detects Indonesian phone number (Exception)");
  }

  // 2. Email detection (Text only)
  try {
    const res2 = await runProtect(null, "My email is test.user@example.com, thanks.");
    assert(res2.flags.some(f => f.type === 'email'), "Text: Detects email address");
  } catch (e) {
    assert(false, "Text: Detects email address (Exception)");
  }
  
  // 3. ID Number detection (Text only)
  try {
    const res3 = await runProtect(null, "NIK saya adalah 3171234567890123.");
    assert(res3.flags.some(f => f.type === 'id_number'), "Text: Detects 16-digit ID number");
  } catch (e) {
    assert(false, "Text: Detects 16-digit ID number (Exception)");
  }

  // 4. Clean text returns continue
  try {
    const res4 = await runProtect(null, "Just a normal message about the weather.");
    assert(res4.flags.length === 0, "Text: Clean text returns empty flags");
  } catch (e) {
    assert(false, "Text: Clean text returns empty flags (Exception)");
  }

  try {
    const res5 = await runProtect(null, "Student report card: Semester 2 grades and GPA");
    assert(res5.flags.some(f => f.type === 'academic_record' && f.severity === 'yellow'), "Text: Detects academic record");
  } catch (e) {
    assert(false, "Text: Detects academic record (Exception)");
  }

  // 5. Image processing tests (If test images exist)
  // We'll skip actual image assertions here unless we supply test images in a real environment,
  // but we can verify the API contract of the `runProtect` function.
  
  console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
}

runTests();
