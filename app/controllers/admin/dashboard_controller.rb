class Admin::DashboardController < ApplicationController
  def index
    @top_queries = SearchQuery.group(:query).order('count_id DESC').count(:id)
  end
end
