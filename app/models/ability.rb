# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    employee = user.employee

    return unless employee&.roles

    can :manage, :dashboard
    employee.roles.each do |role|
      permissions = role.permissions
      permissions.each do |permission|
        permissions_handler(role, permission, employee)
      end
    end
  end

  private

  def permissions_handler(role, permission, employee)
    company = employee.company
    permission_subject = permission.subject.name.singularize.downcase.to_sym
    permission_scope = permission.scope.name.downcase

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
      role: { subject: Role, condition: { id: Role.where("priority > ?", role.priority).ids } },
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
      grant_permissions(permission.allowed_actions, all_subjects_list[permission_subject])
    when "company"
      grant_permissions(permission.allowed_actions, company_subjects_list[permission_subject])
    else
      grant_permissions(permission.allowed_actions, own_subjects_list[permission_subject])
    end
  end

  def grant_permissions(actions, subject)
    if subject
      actions.each do |action|
        can action.name.to_sym, subject[:subject], subject[:condition]
      end
    end
  end
end
