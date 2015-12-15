'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'google-maps'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.generators.Base.extend({

    templates: function () {
        this.composeWith('jhipster:modules', {
            options: {
                jhipsterVar: jhipsterVar, jhipsterFunc: jhipsterFunc
            }
        });
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.red('JHipster Google maps sample') + ' generator!'
        ));

        var questions = 1;

        var prompts = [
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

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: function () {
        var done = this.async();

        this.baseName = jhipsterVar.baseName;
        this.packageName = jhipsterVar.packageName;
        this.angularAppName = jhipsterVar.angularAppName;
        this.frontendBuilder = jhipsterVar.frontendBuilder;
        var webappDir = jhipsterVar.webappDir;

        this.googleAnalyticsId = this.props.googleAnalyticsId;
        this.apiKey = this.props.apiKey;

        jhipsterFunc.addBowerDependency('angular-google-maps', '2.2.1');
        jhipsterFunc.addAngularJsModule('uiGmapgoogle-maps');

        var config = "uiGmapGoogleMapApiProvider.configure({\n" +
            "    key: '"+this.apiKey+"',\n" +
            "    v: '3.20',\n" +
            "    libraries: 'weather,geometry,visualization,places'\n" +
            "});";

        jhipsterFunc.addAngularJsConfig(['uiGmapGoogleMapApiProvider'], config, 'Google maps configuration');
        jhipsterFunc.addMainCSSStyle('.angular-google-map-container { height: 400px; }', 'Google maps')

        // Sample page
        this.template('src/main/webapp/scripts/app/google-maps/_google-maps.controller.js', webappDir + 'scripts/app/google-maps/google-maps.controller.js');
        jhipsterFunc.addJavaScriptToIndex('app/google-maps/google-maps.controller.js');
        this.template('src/main/webapp/scripts/app/google-maps/_google-maps.html', webappDir + 'scripts/app/google-maps/google-maps.html');
        this.template('src/main/webapp/scripts/app/google-maps/_google-maps.js', webappDir + 'scripts/app/google-maps/google-maps.js');
        jhipsterFunc.addJavaScriptToIndex('app/google-maps/google-maps.js');
        jhipsterFunc.addElementToMenu('google-maps', 'globe', false);

        done();
    },

    install: function () {
        var injectDependenciesAndConstants = function () {
            switch (this.frontendBuilder) {
                case 'gulp':
                    this.spawnCommand('gulp', ['ngconstant:dev', 'wiredep:test', 'wiredep:app']);
                    break;
                case 'grunt':
                default:
                    this.spawnCommand('grunt', ['ngconstant:dev', 'wiredep']);
            }
        };

        this.installDependencies({
                callback: injectDependenciesAndConstants.bind(this)
            }
        );
    }
});

