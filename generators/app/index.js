const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const JhipsterGenerator = generator.extend({});
util.inherits(JhipsterGenerator, BaseGenerator);

// Stores JHipster variables
const jhipsterVar = { moduleName: 'google-maps' };

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = JhipsterGenerator.extend({
    initializing: {
        compose() {
            this.composeWith('jhipster:modules',
                { jhipsterVar, jhipsterFunc },
                this.options.testmode ? { local: require.resolve('generator-jhipster/generators/modules') } : null
            );
        },
        readConfig() {
            this.jhipsterAppConfig = this.getJhipsterAppConfig();
            if (!this.jhipsterAppConfig) {
                this.error('Can\'t read .yo-rc.json');
            }
        },
        displayLogo() {
            // it's here to show that you can use functions from generator-jhipster
            // this function is in: generator-jhipster/generators/generator-base.js
            this.printJHipsterLogo();

            // Have Yeoman greet the user.
            this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster JHipster Google Maps')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        },
        checkJhipster() {
            const jhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
            const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
            if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
                this.warning(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
            }
            if (this.jhipsterAppConfig.clientFramework != 'angular1') {
              this.error('This generator only supports AngularJS 1.x (for now).');
            }
        }
    },

    prompting() {
        var questions = 1;

        const prompts = [
            {
              type: 'input',
              name: 'apiKey',
              validate: function (input) {
                  if (input.length > 0) return true;
                  return 'Bizarre, it\'s didn\'t look like to a API key, normaly it\'s like \'AYraStDrM1WNnpQW2-JB1GMV4NtpldHTjU7KUv4\'';
              },
              message: '(1/' + questions + ') What is your google API key?'
            }
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });
    },

    writing() {
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        // read config from .yo-rc.json
        this.baseName = this.jhipsterAppConfig.baseName;
        this.clientFramework = this.jhipsterAppConfig.clientFramework;

        // use function in generator-base.js from generator-jhipster
        this.angularAppName = this.getAngularAppName();

        // use constants from generator-constants.js
        const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

        this.apiKey = this.props.apiKey;

        this.log('\nAdding bower dependency ...');
        jhipsterFunc.addBowerDependency('angular-google-maps', '2.4.1');
        jhipsterFunc.addAngularJsModule('uiGmapgoogle-maps');

        this.log('Adding CSS ...');
        if (jhipsterVar.useSass) {
          jhipsterFunc.addMainSCSSStyle('.angular-google-map-container { height: 400px; }', 'Google maps');
        } else {
          jhipsterFunc.addMainCSSStyle(false, '.angular-google-map-container { height: 400px; }', 'Google maps');
        }

        this.log('Adding JS ...');
        jhipsterFunc.copyTemplate(webappDir + '/app/google-maps/_google-maps.config.js', webappDir + '/app/blocks/config/google-maps.config.js', 'template', this, this.apiKey, true);
        this.template('src/main/webapp/app/google-maps/_google-maps.controller.js', webappDir + '/app/google-maps/google-maps.controller.js');
        this.template('src/main/webapp/app/google-maps/_google-maps.html', webappDir + '/app/google-maps/google-maps.html');
        this.template('src/main/webapp/app/google-maps/_google-maps.state.js', webappDir + '/app/google-maps/google-maps.state.js');

        this.log('Adding a new page to the menu ...');
        jhipsterFunc.addElementToMenu('google-maps', 'globe', false, this.clientFramework);

        this.log('Done writing files!\n');
    },

    install() {
        let logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        if (this.clientFramework === 'angular1') {
            logMsg =
                `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install & bower install`)}`;
        }
        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            } else if (this.clientFramework === 'angular1') {
                this.spawnCommand('gulp', ['install']);
            }
        };
        const installConfig = {
            bower: true,
            npm: false,
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        if (this.options['skip-install']) {
            this.log(logMsg);
        } else {
            this.installDependencies(installConfig);
        }
    },

    end() {
        this.log('End of Google maps generator');
    }
});
