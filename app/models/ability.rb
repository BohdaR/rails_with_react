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
        # case permission.name
        #   # manage whatever
        # when "manage all"
        #   can :manage, :all
        #
        # # when "manage the company"
        # #   can :read, [Role, Permission]
        # #   can :read, [User, Reservation, Favorite], employee: { company: employee.company }
        # #   can [:read, :update, :destroy], Company, id: employee.company_id
        # #   can :manage, Employee, company_id: employee.company_id
        # #   can :manage, [Office, Room], company: employee.company
        # #   can :manage, Place, room: { company: employee.company }
        #
        # # when "manage company employees information"
        # #   can :manage, Employee, id: employee.id
        # #   can :manage, [User, Reservation, Favorite], employee:
        # #
        # # when "read information about the company"
        # #   can :read, Company, id: employee.company_id
        # #   can :read, [Office, Room], company: employee.company
        # #   can :read, Place, room: { company: employee.company }
        # end
      end
    end
  end

  private

    def grant_permissions(permission, employee)
      permission_subject = permission.subject.name.singularize.downcase
      permission_scope = permission.scope.name.capitalize
      permission_allowed_action = permission.allowed_action.name.to_sym

      case permission_subject

        # rails admin permission
      when "rails admin"
        can :access, :rails_admin
        can permission_allowed_action, :dashboard
        return
        # permissions to whole models
      when "all"
        case permission_scope
        when "own"
          can :manage, Employee, id: employee.id
          can :manage, [User, Reservation, Favorite], employee:
        when "company"
          can :read, [User, Reservation, Favorite], employee: { company: employee.company }
          can [:read, :update, :destroy], Company, id: employee.company_id
          can :manage, Employee, company_id: employee.company_id
          can :manage, [Office, Room], company: employee.company
          can :manage, Place, room: { company: employee.company }
        else
          can permission_allowed_action, :all
        end
        return
      end

      other permissions
      model_index = ApplicationRecord.descendants.as_json.index(permission_subject)
      if model_index
        permission_model = ApplicationRecord.descendants[model_index]

        case permission_scope
        when "own"
          case permission_subject
          when "company"
            can permission_allowed_action, Company, id: employee.company_id
          when %w[user reservation favorite]
            can permission_allowed_action, permission_model, employee:
          end
        else
          # permissions without scope (all scope)
          can permission_allowed_action, permission_model
        end
      end
    end
end
