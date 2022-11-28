# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    employee = user.employee

    return unless employee
    employee.roles.each do |role|
      permissions = role.permissions
      permissions.each do |permission|
        grant_permissions(permission, employee)
      end
    end
  end

  private
    def grant_permissions(permission, employee)
      company = employee.company
      permission_subject = permission.subject.name.singularize.downcase.to_sym
      permission_scope = permission.scope.name.downcase
      permission_allowed_action = permission.allowed_action.name.to_sym

      all_subjects_list = {
        all: :all,
        rails_admin: :rails_admin,
        allowed_action: AllowedAction,
        role: Role,
        permission: Permission,
        scope: Scope,
        subject: Subject,
        employee: Employee,
        company: Company,
        user: User,
        office: Office,
        room: Room,
        place: Place,
        reservation: Reservation,
        favorite: Favorite,
      }

      company_subjects_list = {
        rails_admin: { subject: :rails_admin, condition: nil },
        employee: { subject: Employee, condition: { company: } },
        company: { subject: Company, condition: { id: company.id } },
        user: { subject: User, condition: { employee: { company: { id: company.id } } } },
        office: { subject: Office, condition: { company: } },
        room: { subject: Room, condition: { company: } },
        place: { subject: Place, condition: { room: { company: } } },
        reservation: { subject: Reservation, condition: { employee: { company: } } },
        favorite: { subject: Favorite, condition: { employee: { company: } } },
      }

      own_subjects_list = {
        user: { subject: User, condition: { employee: } },
        employee: { subject: Employee, condition: { id: employee.id } },
        reservation: { subject: Reservation, condition: { employee: } },
        favorite: { subject: Favorite, condition: { employee: } },
      }

      # can :access, all_subjects_list[:rails_admin]
      can permission_allowed_action, :dashboard

      case permission_scope
      when "all"
        can permission_allowed_action, all_subjects_list[permission_subject]
      when "company"
        can permission_allowed_action,
            company_subjects_list[permission_subject][:subject],
            company_subjects_list[permission_subject][:condition]
      else
        can permission_allowed_action,
            own_subjects_list[permission_subject][:subject],
            own_subjects_list[permission_subject][:condition]
      end
    end
end
