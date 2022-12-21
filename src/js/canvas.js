import {distance, randomColor, randomIntFromRange} from './utils'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: undefined,
  y: undefined
}

const colors = ['#F23847', '#8B41F2', '#049DD9', '#04BF7B', '#F2CB05'];

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  // init();
});

addEventListener('click', init);

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5
    }
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
  }

  draw() {
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

  update() {
    this.draw();

    for (let i = 0; i < particles.length - 1; i++) {
      if (this === particles[i]) continue;

      if (distance(this.x, this.y, particles[i].x, particles[i].y) - (radius * 2) < 0) {
        resolveCollision(this, particles[i]);
      }
    }

    if (this.x - this.radius <= 0 || this.x + (this.radius + 10) >= innerWidth) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
      this.velocity.y = -this.velocity.y;
    }

    if (distance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.2) {
      this.opacity += 0.02;
    } else if (this.opacity > 0) {
      this.opacity -= 0.02;

      this.opacity = Math.max(0, this.opacity);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// Implementation
let particles;
let radius = 15;

function spawnParticles() {
  for (let i = 0; i < 220; i++) {
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);

    let color = randomColor(colors);

    /**
     *   If the loop is not on its first iteration, loop through all particles and compare the distances
     *   between them. If the distance between any two particles is < 0, regenerate a new x & y coordinate
     *   until a valid unused position is found.
     */
    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (distance(x, y, particles[j].x, particles[j].y) - (radius * 2) < 0) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);

          j = -1;
        }
      }
    }
    particles.push(new Particle(x, y, radius, color));
  }
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
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
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

    // Grab angle between the two colliding particles
    const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

init();
animate();
