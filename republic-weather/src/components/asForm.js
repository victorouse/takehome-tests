import React, { Component } from 'react';

export default function asForm(FormComponent, formName) {
  return class Form extends Component {
    constructor(props) {
      super(props);
      this.updateProperty = this.updateProperty.bind(this);
    }

    updateProperty(key, value) {
      this.props[formName][key] = value;
    }

    render() {
      return (
        <FormComponent {...this.props} updateProperty={this.updateProperty} />
      );
    }
  };
}
