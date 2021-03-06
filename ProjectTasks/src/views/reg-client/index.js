var View = require('../view');
// var router = require('../../app.router');
var inherit = require('../../utils/inherit');
var request = require('../../services/request');
var _ = require('lodash');
var $ = require('jquery/dist/jquery');
var template = require('./reg-client.ejs');

var flagAddClient;

var ClientRegView = function () {
    this.super.constructor.apply(this);
    this.template = template;
    this.promise = null;
    location.hash = 'reg-client';
};

inherit(ClientRegView, View);

ClientRegView.prototype.render = function () {
    flagAddClient = false;
    //this.el.html(this.template());
    this.popup.addClass('on');
    this.popup.html(this.template());
};

ClientRegView.prototype.createEvents = function () {
    this.popup.on('click', '#addClient', this.addClient);
    this.popup.on('click', '.close', this.closePopup);
};
ClientRegView.prototype.addClient = function(){
    if (!flagAddClient) {
        var newUser = {
            id: this.form.newClient.value,
            login: this.form.newClient.value,
            ticketsId: [''],
            role: 'Client'
        };
        request.saveUser(newUser);
        flagAddClient =true;
    }
    // router.navigate('auth');
    // location.hash = 'auth';
    $('#popup div').fadeOut();
    $('#popup').removeClass('on');

    window.history.go(-1);
};

ClientRegView.prototype.closePopup = function(){
    $('#popup div').fadeOut();
    $('#popup').removeClass('on');
    window.history.go(-1);
};

ClientRegView.prototype.fetchData = function () {
    if (!this.promise) {
        var self = this;
        this.promise = request.getUsersList().then(function (data) {
            self.userList = _.map(_.filter(data, {'role':'Client'}), 'login');
            return data;
        });
    }
    return this.promise;
};

module.exports = ClientRegView;
