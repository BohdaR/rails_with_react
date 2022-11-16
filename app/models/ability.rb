# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    if user&.roles.empty?
      can :read, :all # allow everyone to read everything
      can :manage, :rails_admin
    else
      can :access, :rails_admin # only allow admin users to access Rails Admin
      can :manage, :all
    end
  end
end
