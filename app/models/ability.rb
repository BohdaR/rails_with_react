# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    # can [:read], :dashboard
    # can [:read, :update], Reservation, employee_id: user.employee.id
    # can :manage, :rails_admin

    user.roles.each do |role|
      case role.name
      when "superadmin"
        can :access, :rails_admin # only allow admin users to access Rails Admin
        can :manage, :all
      when "company admin"
        can :access, :rails_admin
        can :manage, :dashboard

        can :manage, [User, Reservation, Favorite], employee: { company: user.employee.company }
        can [:read, :update, :destroy], Company, id: user.employee.company_id
        can :manage, Employee, company_id: user.employee.company_id
        can :manage, [Office, Room], company: user.employee.company
        can :manage, Place, room: { company: user.employee.company }
      end
    end
  end
end
