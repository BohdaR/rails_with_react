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
        grant_permissions(permission.name)
        case permission.name
        # manage whatever
        when "manage all"
          can :manage, :all

        # access to rails admin
        when "have access to rails admin"
          can :access, :rails_admin
          can :manage, :dashboard

        when "manage the company"
          can :read, [Role, Permission]
          can :read, [User, Reservation, Favorite], employee: { company: employee.company }
          can [:read, :update, :destroy], Company, id: employee.company_id
          can :manage, Employee, company_id: employee.company_id
          can :manage, [Office, Room], company: employee.company
          can :manage, Place, room: { company: employee.company }

        when "manage company employees information"
          can :manage, Employee, id: employee.id
          can :manage, [User, Reservation, Favorite], employee:

        when "read information about the company"
          can :read, Company, id: employee.company_id
          can :read, [Office, Room], company: employee.company
          can :read, Place, room: { company: employee.company }
        end
      end
    end
  end

  private
    def grant_permissions(permission)
      return if permission.split.length != 3

      action, _, model_name = permission.split
      model_index = ApplicationRecord.descendants.as_json.index(model_name.singularize.capitalize)

      if model_index
        can action.to_sym, ApplicationRecord.descendants[model_index]
      end
    end
end
