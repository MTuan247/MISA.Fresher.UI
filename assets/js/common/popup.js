$(document).ready(function(){
    
})

function showPopup(type, title, message, func) {
    $('body').append(`
        <div class="popup__background">
            <div class="popup popup--${type}">
                <div class="popup__header">
                    <div class="popup__title">${title}</div>
                    <div class="popup__close" onclick="hidePopup()" ></div>
                </div>
                <div class="popup__body">
                    <div class="popup__icon">
                        <img src="./assets/icon/alarm.png" alt="">
                    </div>
                    <div class="popup__content">
                        ${message}
                    </div>
                </div>
                <div class="popup__footer">
                    <div class="btn-seconds cancel" onclick="hidePopup()" >Hủy</div>
                    <div class="btn-default confirm">Xác nhận</div>
                </div>
            </div>
        </div>   
    `)

    $('.popup__background').on('click','.popup .confirm', function(){
        func()
        hidePopup()
    })
}

function showAlarmPopup(){
    let numberDelete = $('tr.selected').length
    $('body').append(`
        <div class="popup__background">
            <div class="popup popup--alarm">
                <div class="popup__header">
                    <div class="popup__title">Xóa ${numberDelete} bản ghi</div>
                    <div class="popup__close" onclick="hidePopup()" ></div>
                </div>
                <div class="popup__body">
                    <div class="popup__icon">
                        <img src="./assets/icon/alarm.png" alt="">
                    </div>
                    <div class="popup__content">
                        Bạn có chắc muốn xóa ${numberDelete} bản ghi hay không?
                    </div>
                </div>
                <div class="popup__footer">
                    <div class="btn-seconds cancel" onclick="hidePopup()" >Hủy</div>
                    <div class="btn-default confirm">Xóa</div>
                </div>
            </div>
        </div>   
    `)

    $('.popup__background').on('click','.popup .confirm', function(){
        debugger
        let employeeIds = []
        $('table tbody').find('tr.selected').each((index, item) => {
            let employeeId = $(item).attr('employeeId')
            employeeIds.push(employeeId)
        })
        let rs = main.deleteMultiple(employeeIds)
        setTimeout(() => {
            if (rs) {
                showToast('success','Đã xóa thành công!')
                main.loadData()
            } else {
                showToast('error', 'Có lỗi xảy ra!')
            }
        },1000)
        hidePopup()
    })

}

function showWarningPopup(){
    $('body').append(`
        <div class="popup__background">
            <div class="popup popup--warning">
                <div class="popup__header">
                    <div class="popup__title">Đóng form nhập thông tin</div>
                    <div class="popup__close" onclick="hidePopup()" ></div>
                </div>
                <div class="popup__body">
                    <div class="popup__icon">
                        <img src="./assets/icon/warning.png" alt="">
                    </div>
                    <div class="popup__content">
                        Bạn có chắc muốn đóng form nhập "Thông tin nhân viên không" hay không?
                    </div>
                </div>
                <div class="popup__footer">
                    <div class="btn-seconds cancel" onclick="hidePopup()" >Hủy</div>
                    <div class="btn-default confirm">Đóng</div>
                </div>
            </div>
        </div>   
    `)

    $('.popup__background').on('click','.popup .confirm', function(){
        $('.modal').fadeOut()
        hidePopup()
    })
}

function hidePopup() {
    $('.popup__background').remove()
}