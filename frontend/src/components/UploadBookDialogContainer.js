import UploadBookDialog from './UploadBookDialog';
import { connect } from 'react-redux';

import {
  uploadBookAction,
  showLoaderAction,
  hideUploadDialogAction
} from './../redux/actions';

const mapStateToProps = (state) => ({
  isUploadDialogShown: state.isUploadDialogShown
});

const mapDispatchToProps = (dispatch) => ({
  handleUploadClick: (data) => {
    dispatch(showLoaderAction());
    dispatch(uploadBookAction(data));
    dispatch(hideUploadDialogAction());
  },
  handleDialogClose: () => {
    dispatch(hideUploadDialogAction());
  }
});

const UploadBookDialogContainer = connect(mapStateToProps, mapDispatchToProps)(UploadBookDialog);

export default UploadBookDialogContainer;
