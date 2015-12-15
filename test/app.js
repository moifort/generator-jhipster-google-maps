'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var fs = require('fs-extra');
var helpers = require('yeoman-generator').test;

describe('Files are created', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({"modules": ['all']})
            .on('end', done);
    });

    it('creates sample page', function () {
        assert.file([
            'src/main/webapp/scripts/app/angular-ui/angular-ui.controller.js',
            'src/main/webapp/scripts/app/angular-ui/angular-ui.html',
            'src/main/webapp/scripts/app/angular-ui/angular-uisss.js'
        ]);
    });
});


/*describe('JHipster generator angular', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({skipInstall: true})
            .withPrompts({
                "baseName": "jhipster",
                "packageName": "com.mycompany.myapp",
                "packageFolder": "com/mycompany/myapp",
                "modules": ['all']
            })
            .on('end', done);
    });

    it('creates sample page', function () {
        assert.file([
            'src/main/webapp/scripts/app/angular-ui/angular-ui.controller.js',
            'src/main/webapp/scripts/app/angular-ui/angular-ui.html',
            'src/main/webapp/scripts/app/angular-ui/angular-ui.js'
        ]);
    });
});*/
