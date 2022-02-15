
import ScreenConfig from "../config/screen.js";

export default class Screen {

    static generatorHtmlCard(item) {
        return `
            <div class="col-md-3">
                <div class="card"
                     style="width: 50%"
                     onClick="window.checkSelect('${item.id}', '${item.name}')"
                >
                    <img src="${item.img}"
                         name="${item.name}"
                         class="card-img-top"
                    />
                </div>
            </div>
            </br>
        `
    }

    static updateHtmlCard(html) {
        const content = document.getElementById(ScreenConfig.environments().id_content_card);
        content.innerHTML = html;
    }

    static createHtmlCardItens(itens) {
        return itens.map(Screen.generatorHtmlCard).join('');
    }

    static updateImgs(itens) {
        const  html = Screen.createHtmlCardItens(itens);
        Screen.updateHtmlCard(html);
    }

    static configButtonStart(onClick) {
        const btnStart = document.getElementById(ScreenConfig.environments().id_btn_start);
        btnStart.onclick = onClick;
    }

    static configButtonShowAllCards(onClick) {
        const btnShowAll = document.getElementById(ScreenConfig.environments().id_btn_show_all_cards);
        btnShowAll.onclick = onClick;
    }

    static configButtonSelectCard(onClick) {
        window.checkSelect = onClick;
    }

    static showCard(card, img) {
        const elements = document.getElementsByName(card);
        elements.forEach(item => (item.src = img));
    }

    static showMessage(status = true) {
        const response = status ?  ScreenConfig.environments().message_success :
                                   ScreenConfig.environments().message_error;

        Swal.fire({
            icon:  response.icon,
            title: response.text,
            showConfirmButton: false,
            timer: response.timer,
            timerProgressBar: true,
            backdrop: response.color
        });
    }

    static initTimer(time) {
        let max = 3;
        const element_timer = document.getElementById(ScreenConfig.environments().id_h4_memorize_start);
        element_timer.classList.remove("d-none");
        const identify = "$$count";
        const text_default = `Time to Memorize: ${identify} seconds...`;

        const updateText = () =>
        (element_timer.innerHTML = text_default.replace(identify, max--));

        updateText();
        const idBreak = setInterval(updateText, time);
        return idBreak;
    }

    static clearTimer(timer) {
        clearInterval(timer);
        const element_timer = document.getElementById(ScreenConfig.environments().id_h4_memorize_start);
        element_timer.classList.add("d-none");
        element_timer.innerHTML = "";
    }
}
