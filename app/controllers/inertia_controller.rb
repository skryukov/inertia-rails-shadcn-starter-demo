# frozen_string_literal: true

class InertiaController < ApplicationController
  inertia_config default_render: true
  inertia_share auth: {
        user: -> { Current.user.as_json(only: %i[id name email verified created_at updated_at]) },
        session: -> { Current.session.as_json(only: %i[id]) }
      }

  rescue_from ActiveRecord::ReadOnlyRecord, with: :redirect_back_with_error

  private

  def redirect_back_with_error(error)
    redirect_back(fallback_location: root_path, alert: error.message)
  end
end
