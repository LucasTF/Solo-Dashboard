from src.controllers.interfaces.usuario_controller_interface import UsuarioControllerInterface
from src.models.serials.serial_response import SerialResponse
from src.views.api.interfaces.view_interface import ViewInterface
from src.views.api.types.http_request import HttpRequest
from src.views.api.types.http_response import HttpResponse


class UsuarioCreateView(ViewInterface):

    def __init__(self, controller: UsuarioControllerInterface) -> None:
        self.__controller = controller

    def handle(self, http_request: HttpRequest) -> HttpResponse:
        user_info = http_request.body
        self.__controller.create(user_info)

        body_response = SerialResponse(message="Usuário criado com sucesso.").model_dump(exclude_none=True)

        return HttpResponse(status_code=201, body=body_response)