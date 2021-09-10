from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    """
    Check if the user is admin or not 
    """
    def has_object_permission(self, request, view, obj):
        return request.user.admin
        

class ProjectMaintainerForProject(permissions.BasePermission):

    
    def has_object_permission(self, request, view, obj):
        print(request.method)
        if request.method=='GET' or request.method== 'POST':
            return True
        else:
            user = request.user
            if user in obj.project_maintained_by.all():
                return True
            else:
                return False

class ProjectMaintainerForList(permissions.BasePermission):

    
    def has_object_permission(self, request, view, obj):
            if request.method=='GET' :
                return True
            else:

                user = request.user
                list_project = obj.list_mapped_to
                if  user in list_project.project_maintained_by.all():
                    return True
                else:
                    return False

class ProjectMaintainerForCard(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):

        if request.method=='GET':
            return True
        else:
            user = request.user
            list_mapped_to1= obj.card_mapped_to
            list_project = list_mapped_to1.list_mapped_to
            if user in list_project.project_maintained_by.all():
                return True
            else:
                return False

class CardAssignedToProjectMaintainer(permissions.BasePermission):

    
    def has_object_permission(self, request, view, obj):
        print(request.method)
        if request.method=='GET' :
            return True
        else:
                
                print(view)
                #maintainers_list = data["card_assigned_to"]
                # list_mapped_to1= obj.card_mapped_to
                # list_project = list_mapped_to1.list_mapped_to
                # for maintainer in maintainers_list:
                #     if maintainer not in list_project.project_maintained_by.all():
                #         return False
                
                return False






class CommentedByUser(permissions.BasePermission):

    
    def has_object_permission(self, request, view, obj):
           
        if request.method=='GET' or request.method== 'POST':
            return True
        else:
            user = request.user
            user_commented = obj.commented_by
            if user==user_commented:
                return True
            else:
                return False

