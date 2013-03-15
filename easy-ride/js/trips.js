// Generated by CoffeeScript 1.4.0
var drivesController, e, template,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

drivesController = drivesController || {};

template = null;

e = null;

jQuery(function() {
  var Drive, DrivesController, RideRequest, RideRequestModal;
  DrivesController = (function() {

    function DrivesController() {
      this.loadDrives = __bind(this.loadDrives, this);

      this.load = __bind(this.load, this);

      this.ajax = __bind(this.ajax, this);
      this.status = $('#trips-driving-status');
      this.statusMsg = $('#trips-driving-msg');
      this.statusLoader = $('#trips-driving-loader');
      this.drives = $('#trips-driving');
      this.rideRequestModal = new RideRequestModal($('#modal-ride-requests'));
      setTimeout(this.ajax, 1000);
    }

    DrivesController.prototype.ajax = function() {
      var _this = this;
      return $.ajax({
        url: '/trips_ajax.php',
        type: 'GET',
        data: {
          'method': 'get_upcoming_drives',
          'data': JSON.stringify({})
        },
        success: this.load,
        complete: function(xhr, status) {
          if (status !== 'success') {
            _this.statusMsg.html("<em>" + xhr.status + ": " + xhr.statusText + "</em>");
            return _this.statusLoader.fadeOut(500, function() {
              return _this.statusMsg.fadeIn(500);
            });
          }
        }
      });
    };

    DrivesController.prototype.load = function(json) {
      var data, drives,
        _this = this;
      data = JSON.parse(json);
      console.log(data);
      drives = data.drives;
      if (drives.length === 0) {
        this.statusLoader.fadeOut(500, function() {
          return _this.statusMsg.fadeIn(500);
        });
        return;
      }
      return this.drives.fadeOut(500, function() {
        _this.status.hide();
        return _this.loadDrives(drives);
      });
    };

    DrivesController.prototype.loadDrives = function(drivesData) {
      var drive, driveData, _i, _len,
        _this = this;
      for (_i = 0, _len = drivesData.length; _i < _len; _i++) {
        driveData = drivesData[_i];
        console.log(drive);
        drive = new Drive(driveData);
        this.drives.append(drive.render());
      }
      this.drives.fadeIn(500);
      $('.dropdown-toggle').dropdown();
      return $('.button-ride-requests').click(function(e) {
        var tripId;
        console.log('Clicked!');
        tripId = $(e.target).data('trip-id');
        _this.rideRequestModal.reset();
        _this.rideRequestModal.show();
        return setTimeout((function() {
          return _this.rideRequestModal.load(tripId);
        }), 1000);
      });
    };

    return DrivesController;

  })();
  Drive = (function() {

    function Drive(data) {
      this.data = data;
      this.data.departure_string = (new Date(parseInt(this.data.departure_time) * 1000)).toLocaleString();
      this.template = _.template($('#trip-row-template').html());
    }

    Drive.prototype.render = function() {
      template = this.template(this.data);
      return this.template(this.data);
    };

    return Drive;

  })();
  RideRequestModal = (function() {

    function RideRequestModal(el) {
      this.el = el;
      this.success = __bind(this.success, this);

      this.load = __bind(this.load, this);

      this.reset = __bind(this.reset, this);

      this.hide = __bind(this.hide, this);

      this.show = __bind(this.show, this);

      this.status = $('#modal-ride-requests-status');
      this.loader = $('#modal-ride-requests-loader');
      this.msg = $('#modal-ride-requests-msg');
      this.spotsRemaining = $('#modal-ride-requests-spots-remaining');
      this.spotsRemainingVal = $('#modal-ride-requests-spots-remaining-value');
      this.form = $('#modal-ride-requests-form');
    }

    RideRequestModal.prototype.show = function() {
      return this.el.modal('show');
    };

    RideRequestModal.prototype.hide = function() {
      return this.el.modal('hide');
    };

    RideRequestModal.prototype.reset = function() {
      this.loader.show();
      this.status.show();
      this.msg.hide();
      this.form.html('').hide();
      return this.spotsRemaining.hide();
    };

    RideRequestModal.prototype.load = function(tripId) {
      var _this = this;
      this.tripId = tripId;
      return $.ajax({
        url: '/trips_ajax.php',
        type: 'GET',
        data: {
          'method': 'get_requests_for_trip',
          'data': JSON.stringify({
            'trip_id': this.tripId
          })
        },
        success: this.success,
        complete: function(xhr, status) {
          if (status !== 'success') {
            _this.msg.html("<em>" + xhr.status + ": " + xhr.statusText + "</em>");
            return _this.loader.fadeOut(500, function() {
              return _this.msg.fadeIn(500);
            });
          }
        }
      });
    };

    RideRequestModal.prototype.success = function(json) {
      var data, requestData, rideRequest, _i, _len, _ref,
        _this = this;
      data = JSON.parse(json);
      if (data.requests.length === 0) {
        this.msg.text('You have no ride requests for this trip.');
        this.loader.fadeOut(500, function() {
          return _this.msg.fadeIn(500);
        });
        return;
      }
      console.log(data);
      _ref = data.requests;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        requestData = _ref[_i];
        rideRequest = new RideRequest(requestData);
        this.form.append(rideRequest.render());
      }
      this.form.slideDown(500);
      return this.loader.fadeOut(500);
    };

    return RideRequestModal;

  })();
  RideRequest = (function() {

    function RideRequest(data) {
      this.data = data;
      this.render = __bind(this.render, this);

      this.template = _.template($('#rider-request-template').html());
    }

    RideRequest.prototype.render = function() {
      this.el = this.template(this.data);
      return this.el;
    };

    return RideRequest;

  })();
  return drivesController = new DrivesController();
});
