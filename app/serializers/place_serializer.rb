class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :number, :room_id
  has_many :favorites
end
