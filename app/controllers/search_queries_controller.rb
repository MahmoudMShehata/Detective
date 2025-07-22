class SearchQueriesController < ApplicationController
  def top
    top_queries = SearchQuery
      .group(:query)
      .order('count_id DESC')
      .limit(5)
      .count(:id)
  
    render json: top_queries.map { |query, count| { query:, count: } }
  end  
end
