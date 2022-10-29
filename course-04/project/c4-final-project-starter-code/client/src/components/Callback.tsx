import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { createBrowserHistory, History } from 'history'
const history = createBrowserHistory()


const auth = new Auth(history)

const handleAuthentication = (props: any) => {
  const location = props.location
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}
function Callback(props: any) {
  return (
    <>
      {handleAuthentication(props)}
      <Dimmer active>
        <Loader content="Loading" />
      </Dimmer>
    </>
  )
}

export default Callback
