# frozen_string_literal: true

class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :number, :x, :y, :room_id
end
