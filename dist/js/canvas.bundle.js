/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: undefined,
  y: undefined
};
var colors = ['#F23847', '#8B41F2', '#049DD9', '#04BF7B', '#F2CB05']; // Event Listeners

addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight; // init();
});
addEventListener('click', init); // Objects

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, radius, color) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5
    };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.save();
      c.globalAlpha = this.opacity;
      c.fillStyle = this.color;
      c.fill();
      c.restore();
      c.strokeStyle = this.color;
      c.stroke();
      c.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();

      for (var i = 0; i < particles.length - 1; i++) {
        if (this === particles[i]) continue;

        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["distance"])(this.x, this.y, particles[i].x, particles[i].y) - radius * 2 < 0) {
          resolveCollision(this, particles[i]);
        }
      }

      if (this.x - this.radius <= 0 || this.x + (this.radius + 10) >= innerWidth) {
        this.velocity.x = -this.velocity.x;
      }

      if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
        this.velocity.y = -this.velocity.y;
      }

      if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["distance"])(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.2) {
        this.opacity += 0.02;
      } else if (this.opacity > 0) {
        this.opacity -= 0.02;
        this.opacity = Math.max(0, this.opacity);
      }

      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  }]);

  return Particle;
}(); // Implementation


var particles;
var radius = 15;

function spawnParticles() {
  for (var i = 0; i < 220; i++) {
    var x = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomIntFromRange"])(radius, canvas.width - radius);
    var y = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomIntFromRange"])(radius, canvas.height - radius);
    var color = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomColor"])(colors);
    /**
     *   If the loop is not on its first iteration, loop through all particles and compare the distances
     *   between them. If the distance between any two particles is < 0, regenerate a new x & y coordinate
     *   until a valid unused position is found.
     */

    if (i !== 0) {
      for (var j = 0; j < particles.length; j++) {
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["distance"])(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
          x = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomIntFromRange"])(radius, canvas.width - radius);
          y = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomIntFromRange"])(radius, canvas.height - radius);
          j = -1;
        }
      }
    }

    particles.push(new Particle(x, y, radius, color));
  }
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(function (particle) {
    particle.update();
  });
}

function init() {
  particles = [];
  spawnParticles();
}
/**
 * Rotates coordinate system for velocities.
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated.
 *
 * @param  velocity | velocity | The velocity of an individual particle
 * @param  angle  | angle | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */


function rotate(velocity, angle) {
  return {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
}
/**
 * Swaps out two colliding particles' x and y velocities after running through
 * > an elastic collision reaction equation.
 * This equation only works in a one-dimensional space. So we must calculate the angle between two
 * > colliding particles, rotate them accordingly to represent a 1D space, apply the equation, then
 * > rotate back to the original angle.
 *
 * @param  particle | particle | A particle object with x and y coordinates, plus velocity
 * @param  otherParticle | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */


function resolveCollision(particle, otherParticle) {
  var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
  var xDist = otherParticle.x - particle.x;
  var yDist = otherParticle.y - particle.y; // Prevent accidental overlap of particles

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x); // Store mass in var for better readability in collision equation

    var m1 = particle.mass;
    var m2 = otherParticle.mass; // Velocity before equation

    var u1 = rotate(particle.velocity, angle);
    var u2 = rotate(otherParticle.velocity, angle); // Velocity after 1d collision equation

    var v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    var v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    }; // Final velocity after rotating axis back to original location

    var vFinal1 = rotate(v1, -angle);
    var vFinal2 = rotate(v2, -angle); // Swap particle velocities for realistic bounce effect

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;
    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map