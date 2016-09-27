const tran_go = 'slide'
const tran_back = 'back'

export const $go = function(link, param){
    closeToasts()
    this.$dispatch('transfer', tran_go)
    let path = param ? link + '\/' + param : link
    this.$route.router.go(path)
}

export const $back = function(link, param){
    closeToasts()
    this.$dispatch('transfer', tran_back)
    let path = param ? link + '\/' + param : link
    this.$route.router.go(path)
}

function closeToasts(){
    let toasts = document.querySelectorAll('.mint-toast')
    if (toasts.length > 0){
        Array.from(toasts).forEach(item => item.parentNode.removeChild(item))
    }
}