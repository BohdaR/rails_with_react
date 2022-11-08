# frozen_string_literal: true

class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :number, :room_id, :created_at, :updated_at
end
