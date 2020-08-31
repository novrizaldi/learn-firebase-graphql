import { connect } from 'react-redux'
import { deleteUser, resendUser } from '../actions'
import User from '../components/User'

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => dispatch(deleteUser(ownProps.Id)),
  resend: () => dispatch(resendUser(ownProps.Id, ownProps.Name, ownProps.Age))
})

export default connect(
  null,
  mapDispatchToProps
)(User)
