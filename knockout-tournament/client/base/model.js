/**
 * Base model class.
 */
class Model {
  /**
   * Creates and instance of Model with an empty Set of listeners.
   */
  constructor() {
    this.listeners = new Set();
  }

  /**
   * Publishes an event to all listeners.
   *
   * @param {string} event - Event to publish.
   * @param {any[]} [args] - Additional parameters to pass to listeners.
   * @returns {void}
   * @example
   * tournament.model.publish('MATCH_COMPLETED', matchUp)
   */
  publish(event, ...args) {
    this.notifyAll(event, ...args);
  }

  /**
   * Getter method for model properties.
   *
   * @param {string} property - Property to get.
   * @returns {any} Property stored by @see {set}.
   */
  get(property) {
    // this.notifyAll('get', property, this[property]);
    return this[property];
  }

  /**
   * Setter method for model properties.
   *
   * @param {string} property - Property name to set.
   * @param {any} value - Value associated to property.
   * @returns {any} Value that was set.
   */
  set(property, value) {
    // this.notifyAll('set', property, this[property]);
    return this[property] = value;
  }

  /**
   * Adds a listener to the set of listeners.
   *
   * @param {Object} listener - The listening class.
   * @returns {void}
   */
  addListener(listener) {
    this.listeners.add(listener);
  }

  /**
   * Deletes a listener from the set of listeners.
   *
   * @param {Object} listener - The listening class.
   * @returns {void}
   */
  deleteListener(listener) {
    this.listeners.delete(listener);
  }

  /**
   * Notifies all listeners in the set of listeners.
   *
   * @param {string} message - Message to send.
   * @param {any} [args] - Additional parameters to pass to listeners.
   * @returns {void}
   */
  notifyAll(message, ...args) {
    for (let listener of this.listeners) {
      listener.notify(this, message, ...args);
    }
  }
}
