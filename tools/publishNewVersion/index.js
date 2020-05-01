const fs = require('fs');
const packageJson = require('../../package');
const currentVersion = packageJson.version;
const { increaseVersionNumber } = require('@meenjs/utils');
const newVersion = increaseVersionNumber(currentVersion);
const { execSync } = require('child_process');

(() => {
    try {
        console.log(`-> Current version: "${currentVersion}" - new version: "${newVersion}"`);

        console.log(`-> Update version: "${newVersion}" to "package.json"`);
        packageJson.version = newVersion;
        fs.writeFileSync('./package.json', JSON.stringify(packageJson, ' ', 4), 'utf-8');

        console.log(`-> Generate "modules/index.js" file`);
        execSync(`node tools/genModuleIndex`);

        console.log(`-> Push to github with message "v${newVersion}"`);
        execSync(`git add .`);
        execSync(`git commit -m "v${newVersion}"`);
        execSync(`git push origin master`);

        console.log(`-> Create new release with message "Release of version ${newVersion}"`);
        execSync(`git tag -a v${newVersion} -m "Release of v${newVersion}"`);
        execSync('git push --tags');

        console.log(`-> Publish version "${newVersion}" to "https://www.npmjs.com/"`);
        execSync('npm publish');

        console.log(`-> "${newVersion}" is published!`);
    } catch (e) {
        console.log(`ERROR: ${e}`);
    }
})();
