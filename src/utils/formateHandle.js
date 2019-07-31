

import moment from "moment";

export default {
    
     changeStatusToString(val,role){
        if(val == 'PW') return '无人受理';
        if(val == 'PI') return '停取中';
        if(val == 'FW'&& role == 'user') return '可取车';
        if(val == 'FW' && role == 'boy') return '已完成';
        if(val == 'WP') return '待支付';
        if(val == 'C') return '已取消';
        if(val == 'F') return '已完成';
        
    },
    dateFormatToString(val){
        return moment(val).format("YYYY年MM月DD日HH:mm:ss");
    }
}

