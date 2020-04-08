// Adapted from https://codepen.io/jacobgunnarsson/pen/pbPwga
class ConfettiCannon {
  constructor(element) {
    this.element = element;
    this.containerElement = null;

    this.confettiFrequency = 3;
    this.confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];

    this._setupElements();
  }

  fire() {
    this._renderConfetti();
  }

  stop() {
    if (this.containerElement) this.element.removeChild(this.containerElement);
  }

  _setupElements() {
    const containerElement = document.createElement('div');
    const elementPosition = this.element.style.position;

    if (elementPosition !== 'relative' || elementPosition !== 'absolute') {
      this.element.style.position = 'relative';
    }

    containerElement.classList.add('confetti-container');
    this.element.appendChild(containerElement);
    this.containerElement = containerElement;
  }

  _renderConfetti() {
    this.confettiInterval = setInterval(() => {
      const confettiElement = document.createElement('div');
      const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
      const confettiLeft = (Math.floor(Math.random() * this.element.offsetWidth)) + 'px';
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

      confettiElement.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
      confettiElement.style.left = confettiLeft;
      confettiElement.style.width = confettiSize;
      confettiElement.style.height = confettiSize;
      confettiElement.style.backgroundColor = confettiBackground;

      confettiElement.removeTimeout = setTimeout(function() {
        confettiElement.parentNode.removeChild(confettiElement);
      }, 3000);
      this.containerElement.appendChild(confettiElement);
    }, 25);
  }
}

