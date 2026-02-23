# Backend_test/controllers/user_controller.py
from Backend_test.models.user import User

class UserController:
    def get_user(self, uid):
        return User.get(uid)
