const { analyzePapersStream } = require('./index');

const stockQuestions = `
Please analyze the following stocks for a 3–5 year buy-and-hold portfolio:

1. HAL (Hindustan Aeronautics Limited) — defense PSU, strong order book from IAF contracts
2. BEL (Bharat Electronics Limited) — radar and electronic warfare systems
3. BHEL (Bharat Heavy Electricals Limited) — power equipment PSU, turnaround candidate
4. Cochin Shipyard — naval shipbuilding, Make in India beneficiary

For each stock, cover:
- Business overview and competitive moat
- Recent financial performance (revenue, margins, debt)
- Key growth drivers and risks over the next 3–5 years
- Valuation view (PE, sector comparison)
- Final verdict: Buy / Hold / Avoid with a brief rationale
`;

async function testStreamInTerminal() {
  console.log('=== Stock Analysis Stream Test ===');
  console.log('Topic: Indian Defense & PSU stocks');
  console.log('Mode: streaming to terminal\n');

  const startedAt = Date.now();

  try {
    await analyzePapersStream(stockQuestions, (chunk) => {
      process.stdout.write(chunk);
    });

    const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
    console.log(`\n\n✅ Stream finished in ${elapsedSec}s`);
  } catch (error) {
    console.error('\n❌ Stream test failed:');
    console.error(error.message);
    process.exitCode = 1;
  }
}

testStreamInTerminal();
