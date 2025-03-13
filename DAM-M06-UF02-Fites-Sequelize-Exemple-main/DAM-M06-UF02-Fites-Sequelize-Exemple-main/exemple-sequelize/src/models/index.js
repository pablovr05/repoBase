/**
 * index.js de models
 * Configuració de les relacions entre els models
 */

const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const Youtuber = require('./Youtuber');
const PerfilYoutuber = require('./PerfilYoutuber');
const Video = require('./Video');
const Categoria = require('./Categoria');
const Llista = require('./Llista');
const Usuari = require('./Usuari');

// Definir el modelo VideosCategories que servirà com a taula d'unió
const VideosCategories = sequelize.define('VideosCategories', {
  video_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Video,
      key: 'id'
    }
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'videos_categories',
  timestamps: false
});

const LlistesVideos = sequelize.define('LlistesVideos', {
  llista_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Llista,
      key: 'id'
    }
  },
  video_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Video,
      key: 'id'
    }
  }
});

const VideosComentaris = sequelize.define('VideosComentaris', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  videoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Video,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuari,
      key: 'id'
    }
  },
  comentari: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'VideosComentaris',
  timestamps: false,
});

VideosComentaris.belongsTo(Video, { foreignKey: 'videoId' });
Video.hasMany(VideosComentaris, { foreignKey: 'videoId' });

VideosComentaris.belongsTo(Usuari, { foreignKey: 'userId' });
Usuari.hasMany(VideosComentaris, { foreignKey: 'userId' });

const VideosValoracions = sequelize.define('VideosValoracions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  videoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Video,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuari,
      key: 'id'
    }
  },
  esLike: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  tableName: 'VideosValoracions',
  timestamps: false,
});

Video.belongsToMany(Usuari, { through: VideosValoracions, foreignKey: 'videoId' });
Usuari.belongsTo(Video, { through: VideosValoracions, foreignKey: 'userId' });

// Relación 1:1 entre Youtuber y PerfilYoutuber
Youtuber.hasOne(PerfilYoutuber, { foreignKey: 'youtuber_id' });
PerfilYoutuber.belongsTo(Youtuber, { foreignKey: 'youtuber_id' });

// Relación 1:N entre Youtuber y Video
Youtuber.hasMany(Video, { foreignKey: 'youtuber_id' });
Video.belongsTo(Youtuber, { foreignKey: 'youtuber_id' });

// Relación N:M entre Video y Categoria
Video.belongsToMany(Categoria, { through: VideosCategories, foreignKey: 'video_id' });
Categoria.belongsToMany(Video, { through: VideosCategories, foreignKey: 'categoria_id' });

// Relación N:M entre Video y Llista
Llista.belongsToMany(Video, { through: LlistesVideos, foreignKey: 'llista_id' });
Video.belongsToMany(Llista, { through: LlistesVideos, foreignKey: 'video_id' });

module.exports = {
  Youtuber,
  PerfilYoutuber,
  Video,
  Categoria,
  Llista,
  VideosCategories,
  LlistesVideos,
  Usuari,
  VideosValoracions,
  VideosComentaris,
};
