# frozen_string_literal: true

class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :place_id, :employee_id
end
