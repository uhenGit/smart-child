const gallery = document.querySelector('.gallery');
const items = document.querySelectorAll('.rand_imgs');
const closeBtn = document.querySelector('.close_modal_similar');
let clickedItems = [];

const mainRefresh = () => location.reload();

const showModal = (msg) => {
    document.querySelector(".msg").innerHTML = msg;
    $('#resultModal-similar').modal('show');
    $('#resultModal-similar').on('hide.bs.modal', mainRefresh)
}

const targetImg = (e) => {
    let msg = '';
    if (e.target.classList.contains('rand_imgs') && clickedItems.length < 2) {
        e.target.removeEventListener('click', targetImg);
        e.target.classList.add('checked');
        let targetNum = e.target.getAttribute('src').split('leaf')[1].split('')[1];
        clickedItems.push(Number(targetNum));
    }
    if (clickedItems.length == 2) {
        if (clickedItems[0] == clickedItems[1]) {
            msg = "<h2 class='h2'>Perfect! You are right!</h2>";
        } else {
            msg = "<h2 class='h2'>Try again</h2>";
        }
        clickedItems.length = 0;
        showModal(msg);
    }
}
items.forEach((item) => {item.addEventListener('click', targetImg)});
