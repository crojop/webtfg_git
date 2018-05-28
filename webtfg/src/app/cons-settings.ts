export class ConsSettings {
    public static URL_PRODUCTS:string = "http://vpayment.perentec.com/API/V2/products/";
    public static URL_RESOURCES:string = "http://vpayment.perentec.com/API/V2/resources/";
    public static URL_IMAGES:string = "http://vpayment.perentec.com/resources/";
    public static URL_TAG:string = "http://vpayment.perentec.com/API/V2/tags/";
    public static URL_EVENTS:string = "http://vpayment.perentec.com/API/V2/events/";
    public static URL_TERMINALS:string = "http://vpayment.perentec.com/API/V2/terminals/";
    public static URL_USERS:string = "http://vpayment.perentec.com/API/V2/users/";
    public static URL_AUTH = "http://vpayment.perentec.com/API/V2/authenticate";

    public static EVENT_U = "event";
    public static TAG_U = "tag";
    public static USER_U = "user";
    public static TERMINAL_U = "terminal";
    public static RESOURCE = "resource";
    public static IMAGE = "image";
    public static PRODUCT_U = "product";

    public static SINGLE_GET = "single_get";
    public static POST = "post";
    public static PUT = "put";
    public static DELETE = "delete";
    public static PLURAL_GET = "plural_get";

    public static CURRENT_USER = "currentUser";
    public static Token = "Token";

    //TAG
    public static attr_tag_id = "tag_id";
    public static attr_tag_code = "tag_code";
    public static attr_tag_description = "tag_description";
    public static attr_event_id = "event_id";
    public static attr_event_description = "event_description";
    public static attr_user_id = "user_id";
    public static attr_user_description = "user_description";
    public static attr_balance = "balance";

    //USER
    public static attr_user_name = "user_name";

    //TERMINAL
    public static attr_terminal_id = "terminal_id";
    public static attr_terminal_serial_number = "terminal_serial_number";
    public static attr_terminal_description = "terminal_description";
    public static attr_terminal_type = "terminal_type";
    public static attr_terminal_password = "terminal_password";

    //PRODUCT
    public static attr_resource_id = "resource_id";
    public static attr_resource_title = "resource_title";
    public static attr_resource_description = "resource_description";
    public static attr_resource_price = "resource_price";
    public static attr_resource_img = "resource_img";
    public static attr_files = "files";
    public static attr_image = "image";

    //EVENT
    public static attr_event_start_date = "event_start_date";
    public static attr_event_end_date = "event_end_date";

    //ROUTING
    public static path_event_form = "event-form";
    public static path_event_component = "events";
    public static path_user_form = "user-form";
    public static path_user_component = "users";
    public static path_tag_form = "tag-form";
    public static path_tag_component = "tags";
    public static path_terminal_form = "terminal-form";
    public static path_terminal_component = "terminals";
    public static path_product_component = "products";
    public static path_product_form = "product-form";

    public static path_dashboard = "dashboard";
    public static path_login = "login";
    public static path_register = "register";

    public static title_event_s = "Eventos";
    public static title_event = "Evento";
    public static title_user = "Asistente";
    public static title_user_s = "Asistentes";
    public static title_product = "Producto";
    public static title_product_s = "Productos";
    public static title_terminal = "Terminal";
    public static title_terminal_s = "Terminales";
    public static title_tag = "Pulsera";
    public static title_tag_s = "Pulseras";

    public static Error = "Error";
    public static Code = "Code";
    public static action_edit = "edit";

    public static CODE_FORBIDDEN = 403;
    public static CODE_REG_ALR_EXISTS = "902";
    public static CODE_SUCCESS = "000";
    public static CODE_USERNAME_ERROR = "911";
    public static CODE_PASSWORD_ERROR = "912";

    public static DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

}
