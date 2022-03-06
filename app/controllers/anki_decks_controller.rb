class AnkiDecksController < ApplicationController
  before_action :set_anki_deck, only: %i[ show edit update destroy ]

  # GET /anki_decks or /anki_decks.json
  def index
    @anki_decks = AnkiDeck.all
  end

  # GET /anki_decks/1 or /anki_decks/1.json
  def show
  end

  # GET /anki_decks/new
  def new
    @anki_deck = AnkiDeck.new
  end

  # GET /anki_decks/1/edit
  def edit
  end

  # POST /anki_decks or /anki_decks.json
  def create
    @anki_deck = AnkiDeck.new(anki_deck_params)

    respond_to do |format|
      if @anki_deck.save
        format.html { redirect_to anki_deck_url(@anki_deck), notice: "Anki deck was successfully created." }
        format.json { render :show, status: :created, location: @anki_deck }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @anki_deck.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /anki_decks/1 or /anki_decks/1.json
  def update
    respond_to do |format|
      if @anki_deck.update(anki_deck_params)
        format.html { redirect_to anki_deck_url(@anki_deck), notice: "Anki deck was successfully updated." }
        format.json { render :show, status: :ok, location: @anki_deck }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @anki_deck.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /anki_decks/1 or /anki_decks/1.json
  def destroy
    @anki_deck.destroy

    respond_to do |format|
      format.html { redirect_to anki_decks_url, notice: "Anki deck was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_anki_deck
      @anki_deck = AnkiDeck.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def anki_deck_params
      params.fetch(:anki_deck, {})
    end
end
