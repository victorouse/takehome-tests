import React from 'react'
import { Image, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import R from 'ramda'

import { stringIsValid, emailIsValid, renderError } from '../utils'
import { actions } from '../reducers'
import ButtonGroup from '../components/ButtonGroup'
import Button from '../components/Button'
import BackgroundImage from '../components/BackgroundImage'
import TextInput from '../components/TextInput'
import ErrorText from '../components/ErrorText'

const cogniLogoWhite = require('../assets/cogni-logo-white.png')

const buttons = [
  { title: 'Login', authMode: 'login' },
  { title: 'Signup', authMode: 'signup' },
]

const validate = values => {
  const errors = {}

  if (values.name) {
    if (!stringIsValid(values.name)) errors.name = 'Name is invalid'
  } else {
    errors.name = 'Name is required'
  }

  if (values.email) {
    if (!(stringIsValid(values.email) && emailIsValid(values.email)))
      errors.email = 'Email is invalid'
  } else {
    errors.email = 'Email is required'
  }

  return errors
}

const submitForm = (signup, login, authMode) => ({ email, name }) => {
  if (authMode === 'signup') {
    signup({ email, name })
  } else if (authMode === 'login') {
    login({ email, name })
  }
}

export const AuthScreen = ({ signup, login, setAuthMode, authMode, auth }) => (
  <BackgroundImage>
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
      }}
    >
      <Image
        source={cogniLogoWhite}
        style={{ width: 250, resizeMode: 'contain' }}
      />

      <ButtonGroup
        activeIndex={buttons.findIndex(button => button.authMode === authMode)}
        onChange={button => setAuthMode({ authMode: button.authMode })}
        buttons={buttons}
        style={{ marginBottom: 20 }}
      />

      <Formik
        validate={validate}
        onSubmit={submitForm(signup, login, authMode)}
      >
        {({ handleSubmit, handleChange, handleBlur, errors, touched }) => (
          <React.Fragment>
            <TextInput
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              style={!(touched.name && errors.name) && { marginBottom: 20 }}
            />

            {touched.name &&
              errors.name && <ErrorText>{errors.name}</ErrorText>}

            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              style={!(touched.email && errors.email) && { marginBottom: 20 }}
            />

            {touched.email &&
              errors.email && <ErrorText>{errors.email}</ErrorText>}

            {!R.isEmpty(auth.errors) && (
              <View style={{ alignItems: 'center' }}>
                {Array.isArray(auth.errors)
                  ? auth.errors.map(renderError)
                  : renderError(auth.errors)}
              </View>
            )}

            <Button
              title={
                auth.loading
                  ? 'Loading...'
                  : authMode === 'login'
                    ? 'Login'
                    : 'Signup'
              }
              disabled={auth.loading}
              onPress={handleSubmit}
            />
          </React.Fragment>
        )}
      </Formik>
    </View>
  </BackgroundImage>
)

const mapStateToProps = state => ({
  authMode: state.ui.authMode,
  auth: state.auth,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signup: actions.signup.call,
      login: actions.login.call,
      setAuthMode: actions.setAuthMode,
    },
    dispatch,
  )

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(AuthScreen)
