
export default class ScreenConfig {

    static environments() {
        return {
            id_content_card:       "content-cards",
            id_btn_start:          "start",
            id_btn_show_all_cards: "show",
            id_h4_memorize_start:  "timer",
            message_success: {
                icon:  "success",
                text:  "Combined cards, congratulations!",
                timer: 2000,
                color: "rgba(0,255,113,0.4)"
            },
            message_error: {
                icon:  "error",
                text:  "Cards don't combines, good luck!",
                timer: 2000,
                color: "rgba(255, 0, 0,0.4)"
            }
        };
    }
}