/**
 * Base view class.
 */
class View {
  /**
   * Creates an instance of View with an attached Model.
   *
   * @param {Object} model - The {@link Model|Model} to attach.
   */
  constructor(model) {
    this.model = model;
    model.addListener(this);
  }
}
