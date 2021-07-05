import { Component } from "react";

import { connect } from "react-redux";
import { initSocket } from "../../../redux/actions/SocketActions";
import { toggle } from "../../../redux/actions/UIActions";
import { logout } from "../../../redux/actions/AuthActions";
import { pushNotification } from '../../../redux/actions/NotificationActions';

class SocketHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.initSocket();
  }

  _subscribe = () => {
    const { userData } = this.props;
    if (!userData) return;
    this._onBanUser();
  };

  _onBanUser = () => {
    const { socket, userData, toast, logout } = this.props;
    socket.on("banUser", user => {
      if (user.id === userData._id && user.deletionFlag === true) {
        toast({
          message:
            "Tài khoản đã bị cấm. Vui lòng liên hệ quản trị viên để biết thêm chi tiết",
          duration: 5000,
        });
        logout();
      }
    });
  };

  render() {
    const { socket } = this.props;
    if (socket) {
      this._subscribe();
    }

    return null;
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socket,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSocket: () => {
      dispatch(initSocket());
    },
    toast: toast => {
      dispatch(toggle(toast));
    },
    logout: () => {
      dispatch(logout());
    },
    pushNotification: notification => {
      dispatch(pushNotification(notification))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketHandle);
