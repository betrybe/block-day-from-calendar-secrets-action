const core = require('@actions/core');
const { JWT } = require('google-auth-library');
const { google } = require('googleapis');
const sheets = google.sheets('v4');

async function exportCurrentCohortBlock(googleAuth, sheetId, cohortTabRange, blockRow, envVarName) {
  core.info(`Loading values from ${cohortTabRange} calendar...`)

  await sheets.spreadsheets.values.get({
    auth: googleAuth,
    spreadsheetId: sheetId,
    range: cohortTabRange,
  }).then(response => {
    const rows = response.data.values;

    const today = new Date().toISOString().replace(/T/, "-").split("-");
    const formattedDate = `${today[2]}/${today[1]}/${today[0]}`;

    const matchedDateIndex = rows[0].findIndex((e) => e === formattedDate)

    let match = null;

    for (let i = matchedDateIndex; i > 0; i--) {
      if (rows[blockRow][i].match(/\d+\.\d+/)) {
        match = rows[blockRow][i];
        break;
      }
    }
    core.exportVariable(envVarName, match);
  });
}

async function run() {
  try {
    const auth_private_key = core.getInput('auth-private-key');
    const auth_client_email = core.getInput('auth-client-email');
    const sheetId = core.getInput('spreadsheet');

    const googleAuth = new JWT(
      auth_client_email,
      null,
      auth_private_key,
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );

    const cohort1_TabRange = "TURMA-01-v2!B2:OA10";
    const cohort1_BlockRow = 8;
    const cohort1_EnvVarName = "SD_COHORT_1";
    await exportCurrentCohortBlock(googleAuth, sheetId, cohort1_TabRange, cohort1_BlockRow, cohort1_EnvVarName);

    const cohort2_TabRange = "TURMA-02-v2!B2:NM10";
    const cohort2_BlockRow = 8;
    const cohort2_EnvVarName = "SD_COHORT_2";
    await exportCurrentCohortBlock(googleAuth, sheetId, cohort2_TabRange, cohort2_BlockRow, cohort2_EnvVarName);

    const cohort3_TabRange = "TURMA-03-v2!B2:NM7";
    const cohort3_BlockRow = 5;
    const cohort3_EnvVarName = "SD_COHORT_3";
    await exportCurrentCohortBlock(googleAuth, sheetId, cohort3_TabRange, cohort3_BlockRow, cohort3_EnvVarName);

    const cohort4_TabRange = "TURMA-04-v2!B2:OS7";
    const cohort4_BlockRow = 5;
    const cohort4_EnvVarName = "SD_COHORT_4";
    await exportCurrentCohortBlock(googleAuth, sheetId, cohort4_TabRange, cohort4_BlockRow, cohort4_EnvVarName);

    const cohort5_TabRange = "TURMA-05-v2!B2:OM7";
    const cohort5_BlockRow = 5;
    const cohort5_EnvVarName = "SD_COHORT_5";
    await exportCurrentCohortBlock(googleAuth, sheetId, cohort5_TabRange, cohort5_BlockRow, cohort5_EnvVarName);

    const cohort6_TabRange = "TURMA-06!B2:PQ7";
    const cohort6_BlockRow = 5;
    const cohort6_EnvVarName = "SD_COHORT_6";
    await exportCurrentCohortBlock(googleAuth, sheetId, cohort6_TabRange, cohort6_BlockRow, cohort6_EnvVarName);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
