import unittest
from unittest.mock import Mock

from src.controllers.usuario_controller import UsuarioController
from src.models.serials.serial_response import SerialResponse


class UsuarioControllerTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.__controller = UsuarioController(Mock())

    def test_create_without_id(self):

        # Sample without ID
        sample_dict = {
            "name": "John Doe",
            "email": "test@email.com",
            "password": "123456",
            "is_admin": False
        }

        result = self.__controller.create(sample_dict)

        self.assertIsInstance(result, SerialResponse)
        self.assertEqual(result.message, 'Usuário criado com sucesso.')

    def test_create_without_is_admin_and_id(self):

        # Sample without is_admin
        sample_dict = {
            "name": "Jane Doe",
            "email": "test@email.com",
            "password": "123456"
        }

        result = self.__controller.create(sample_dict)

        self.assertIsInstance(result, SerialResponse)
        self.assertEqual(result.message, 'Usuário criado com sucesso.')