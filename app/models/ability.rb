# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    employee = user.employee

    return unless employee&.roles

    can :manage, :dashboard
    employee.roles.each do |role|
      permissions = role.permissions
      permissions.each do |permission|
        permissions_handler(permission, employee)
      end
    end
  end

  private

  def permissions_handler(permission, employee)
    company = employee.company
    permission_subject = permission.subject.name.singularize.downcase.to_sym
    permission_scope = permission.scope.name.downcase
    permission_allowed_action = permission.allowed_action.name.to_sym

    all_subjects_list = {
      all: { subject: :all, condition: nil },
      rails_admin: { subject: :rails_admin, condition: nil },
      allowed_action: { subject: AllowedAction, condition: nil },
      role: { subject: Role, condition: nil },
      permission: { subject: Permission, condition: nil },
      scope: { subject: Scope, condition: nil },
      subject: { subject: Subject, condition: nil },
      employee: { subject: Employee, condition: nil },
      company: { subject: Company, condition: nil },
      user: { subject: User, condition: nil },
      office: { subject: Office, condition: nil },
      room: { subject: Room, condition: nil },
      place: { subject: Place, condition: nil },
      reservation: { subject: Reservation, condition: nil },
      favorite: { subject: Favorite, condition: nil },
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

    case permission_scope
    when "all"
      grant_permissions(permission_allowed_action, all_subjects_list[permission_subject])
    when "company"
      grant_permissions(permission_allowed_action, company_subjects_list[permission_subject])
    else
      grant_permissions(permission_allowed_action, own_subjects_list[permission_subject])
    end
  end

  def grant_permissions(action, subject)
    if subject
      can action, subject[:subject], subject[:condition]
    end
  end
end
